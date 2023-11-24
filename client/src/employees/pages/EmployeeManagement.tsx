import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AdminAppBar from "../../admin/components/AdminAppBar";
import AdminToolbar from "../../admin/components/AdminToolbar";
import ConfirmDialog from "../../core/components/ConfirmDialog";
import SelectToolbar from "../../core/components/SelectToolbar";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import EmployDialog from "../components/EmployeeDialog";
import EmployTable from "../components/EmployeeTable";
import { Employee } from "../types/employee";
import {
  getEmploy,
  addEmploy,
  updateEmploy,
  deleteEmploy,
} from "../../redux/actions/employAction";
import { RootStore } from "../../utils/TypeScript";
import { useTypedDispatch, useTypedSelector } from "../../redux/store";

const EmployeeManagement = () => {
  const { employ } = useTypedSelector((state: RootStore) => state);
  const snackbar = useSnackbar();
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getEmploy());
  },[]);

  const { employees, isAdding, isUpdating, isDeleting } = employ;

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openEmployeeDialog, setOpenEmployeeDialog] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [employDeleted, setEmployDeleted] = useState<string[]>([]);
  const [employUpdated, setEmployUpdated] = useState<Employee | undefined>(
    undefined
  );

  const processing = isAdding || isDeleting || isUpdating;

  const handleAddEmploy = async (employ: Partial<Employee>) => {
    dispatch(addEmploy(employ as Employee))
      .then(() => {
        snackbar.success(t("userManagement.notifications.addSuccess"));
        setOpenEmployeeDialog(false);
      })
      .catch(() => {
        snackbar.error(t("common.errors.unexpected.subTitle"));
      });
  };

  const handleDeleteEmploy = async () => {
    dispatch(deleteEmploy(employDeleted))
      .then(() => {
        snackbar.success(t("userManagement.notifications.deleteSuccess"));
        setSelected([]);
        setEmployDeleted([]);
        setOpenConfirmDeleteDialog(false);
      })
      .catch(() => {
        snackbar.error(t("common.errors.unexpected.subTitle"));
      });
  };

  const handleUpdateEmploy = async (employ: Employee) => {
    dispatch(updateEmploy(employ))
      .then(() => {
        snackbar.success(t("userManagement.notifications.updateSuccess"));
        setOpenEmployeeDialog(false);
      })
      .catch(() => {
        snackbar.error(t("common.errors.unexpected.subTitle"));
      });
  };

  const handleCancelSelected = () => {
    setSelected([]);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false);
  };

  const handleCloseEmployDialog = () => {
    setEmployUpdated(undefined);
    setOpenEmployeeDialog(false);
  };

  const handleOpenConfirmDeleteDialog = (employIds: string[]) => {
    setEmployDeleted(employIds);
    setOpenConfirmDeleteDialog(true);
  };

  const handleOpenEmployeeDialog = (employees?: Employee) => {
    setEmployUpdated(employees);
    setOpenEmployeeDialog(true);
  };

  const handleSelectedChange = (newSelected: string[]) => {
    setSelected(newSelected);
  };

  return (
    <React.Fragment>
      <AdminAppBar>
        {!selected.length ? (
          <AdminToolbar title={t("userManagement.toolbar.title")}>
            <Fab
              aria-label="logout"
              color="primary"
              disabled={processing}
              onClick={() => handleOpenEmployeeDialog()}
              size="small"
            >
              <AddIcon />
            </Fab>
          </AdminToolbar>
        ) : (
          <SelectToolbar
            processing={processing}
            onCancel={handleCancelSelected}
            onDelete={handleOpenConfirmDeleteDialog}
            selected={selected}
          />
        )}
      </AdminAppBar>
      <EmployTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenEmployeeDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        employees={employees}
      />
      <ConfirmDialog
        description={t("userManagement.confirmations.delete")}
        pending={processing}
        onClose={handleCloseConfirmDeleteDialog}
        onConfirm={handleDeleteEmploy}
        open={openConfirmDeleteDialog}
        title={t("common.confirmation")}
      />
      {openEmployeeDialog && (
        <EmployDialog
          onAdd={handleAddEmploy}
          onClose={handleCloseEmployDialog}
          onUpdate={handleUpdateEmploy}
          open={openEmployeeDialog}
          processing={processing}
          employ={employUpdated}
        />
      )}
    </React.Fragment>
  );
};

export default EmployeeManagement;
