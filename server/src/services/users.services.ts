import qs from "qs"
import mongoose, {
    DocumentDefinition,
    FilterQuery,
    QueryOptions,
    UpdateQuery,
} from "mongoose"
import UsersModel from "../model/userModel"
import IUser from "../interface/userInterface";
import axios from "axios"

export const createUser = async (
    input: DocumentDefinition<
        Omit<IUser, "createdAt" | "updatedAt" | "comparePassword">
    >
) => {
    try {
        return await UsersModel.create(input)
    } catch (e: any) {
        throw new Error(e)
    }
}

export interface GoogleUserProp {
    id: string
    email: string
    verified_email: boolean
    name: string
    picture: string
    locale: string
}

export const getGoogleUser = async ({
    id_token,
    access_token,
}: {
    id_token: string
    access_token: string
}): Promise<GoogleUserProp> => {
    try {
        const res = await axios.get<GoogleUserProp>(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        )
        return res.data
    } catch (e: any) {
        console.log(e)
        throw new Error(e)
    }
}

export const findAndUpdateUser = async (
    query: FilterQuery<IUser>,
    update: UpdateQuery<IUser>,
    options: QueryOptions = {}
) => {
    return UsersModel.findOneAndUpdate(query, update, options).lean()
}


interface GoogleTokenProps {
    access_token: string
    expires_in: number
    refresh_token: string
    scope: string
    token_type: string
    id_token: string
}

export const getGoogleOauthTokens = async ({
    code,
}: {
    code: string
}): Promise<GoogleTokenProps> => {
    const url = "https://oauth2.googleapis.com/token"

    const values = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
    }

    try {
        const res = await axios.post<GoogleTokenProps>(
            url,
            qs.stringify(values),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        return res.data
    } catch (error: any) {
        console.error(error.response.data.error)
        throw new Error(error.message)
    }
}
