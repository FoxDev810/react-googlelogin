import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Employee } from "../types/employee";

type EmployeeDialogProps = {
  onAdd: (employ: Partial<Employee>) => void;
  onClose: () => void;
  onUpdate: (employ: Employee) => void;
  open: boolean;
  processing: boolean;
  employ?: Employee;
};

const EmployeeDialog = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  employ,
}: EmployeeDialogProps) => {
  const { t } = useTranslation();

  const editMode = Boolean(employ && employ._id);

  const handleSubmit = (values: Partial<Employee>) => {
    if (employ && employ._id) {
      onUpdate({ ...values, id: employ._id } as Employee);
    } else {
      onAdd(values);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: employ ? employ.name : "",
      age: employ ? employ.age : "",
      salary: employ ? employ.salary : "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, t("common.validations.max", { size: 20 }))
        .required(t("common.validations.required")),
      age: Yup.string()
        .required(t("common.validations.required")),
      salary: Yup.string()
        .required(t("common.validations.required")),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="user-dialog-title">
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="user-dialog-title">
          {editMode
            ? t("userManagement.modal.edit.title")
            : t("userManagement.modal.add.title")}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label={"Name"}
            name="name"
            autoComplete="family-name"
            autoFocus
            disabled={processing}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="age"
            label={"Age"}
            name="age"
            autoComplete="given-age"
            disabled={processing}
            value={formik.values.age}
            onChange={formik.handleChange}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="salary"
            label={"Salary"}
            name="salary"
            autoComplete="salary"
            disabled={processing}
            value={formik.values.salary}
            onChange={formik.handleChange}
            error={formik.touched.salary && Boolean(formik.errors.salary)}
            helperText={formik.touched.salary && formik.errors.salary}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("common.cancel")}</Button>
          <LoadingButton loading={processing} type="submit" variant="contained">
            {editMode
              ? t("userManagement.modal.edit.action")
              : t("userManagement.modal.add.action")}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmployeeDialog;
