"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { PasswordInput } from "@/components/auth-ui/password-input";
import { logout } from "@/lib/auth";
import { useStateContext } from "@/hooks/useStateContext";
import axios from "axios";
import { toast } from "sonner";

const SecuritySection = () => {
  const { setIsLoggedIn } = useStateContext();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout(setIsLoggedIn);
    setIsLoggingOut(false);
  };
  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Authentication required. Please log in again.");
      return;
    }

    if (!currentPassword || !newPassword || !newPasswordConfirmation) {
      toast.error("Please fill all password fields.");
      return;
    }

    if (newPassword !== newPasswordConfirmation) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      setIsChangingPassword(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/change-password`,
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirmation("");
      setShowChangePasswordDialog(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to change password. Please try again.",
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Authentication required. Please log in again.");
      return;
    }

    try {
      setIsDeleting(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/delete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      setDeleteConfirmText("");
      setShowDeleteDialog(false);
      toast.success("Account deleted successfully.");
      window.location.href = "/";
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete account. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] p-4 sm:p-6 lg:p-8 flex flex-col flex-1">
        <div className="flex flex-col gap-4 xl:gap-6">
          {/* Log Out */}
          <button
            type="button"
            onClick={() => setShowLogoutDialog(true)}
            className="border border-[#DFE3E8] rounded-xl px-6 py-4.5 flex items-center shadow-[0px_3px_50px_0px_rgba(211,211,211,0.2)] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex-1 flex flex-col items-start">
              <p className="text-base font-semibold text-textPrimary leading-6">
                Log Out
              </p>
            </div>
            <ChevronLeft className="size-6 text-[#637381] rotate-180" />
          </button>

          {/* Change Password */}
          <button
            type="button"
            onClick={() => setShowChangePasswordDialog(true)}
            className="border border-[#DFE3E8] rounded-xl px-6 py-4.5 flex items-center shadow-[0px_3px_50px_0px_rgba(211,211,211,0.2)] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex-1 flex flex-col items-start">
              <p className="text-base font-semibold text-textPrimary leading-6">
                Change Password
              </p>
            </div>
            <ChevronLeft className="size-6 text-[#637381] rotate-180" />
          </button>

          {/* Delete Account */}
          <button
            type="button"
            onClick={() => setShowDeleteDialog(true)}
            className="border border-[#DFE3E8] rounded-xl px-6 py-4.5 flex items-center shadow-[0px_3px_50px_0px_rgba(211,211,211,0.2)] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex-1 flex flex-col items-start">
              <p className="text-base font-semibold text-textPrimary leading-6">
                Delete Account
              </p>
            </div>
            <ChevronLeft className="size-6 text-[#637381] rotate-180" />
          </button>
        </div>
      </div>

      {/* Log Out Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-120 rounded-lg p-5 sm:p-8 gap-5">
          <div className="flex flex-col items-center gap-2 text-center text-textPrimary">
            <DialogTitle className="text-2xl font-semibold leading-9">
              Log out
            </DialogTitle>
            <p className="text-base leading-6">Are you sure you want to Log out?</p>
          </div>
          <div className="flex gap-2 w-full">
            <button
              type="button"
              onClick={() => setShowLogoutDialog(false)}
              className="flex-1 border border-[#454F5B] rounded py-4 px-8 text-[15px] font-bold text-[#454F5B] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex-1 bg-[#FF4842] rounded py-4 px-8 text-[15px] font-bold text-white hover:bg-[#e63e38] transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? "Logging Out..." : "Log Out"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog
        open={showChangePasswordDialog}
        onOpenChange={setShowChangePasswordDialog}
      >
        <DialogContent className="sm:max-w-128.5 rounded-2xl p-5 sm:p-8 lg:p-10 gap-5 shadow-[0px_8px_16px_0px_rgba(145,158,171,0.16)]">
          <DialogTitle className="text-lg font-medium text-[#161C24] leading-7 text-center">
            Change Password
          </DialogTitle>
          <div className="border-b border-[#DFE3E8]" />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-semibold text-[#454F5B] leading-6">
                  Current Password
                </label>
                <PasswordInput
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="h-12.5 bg-white"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-semibold text-[#454F5B] leading-6">
                  New Password
                </label>
                <PasswordInput
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="h-12.5 bg-white"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-semibold text-[#454F5B] leading-6">
                  Confirm Password
                </label>
                <PasswordInput
                  value={newPasswordConfirmation}
                  onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                  placeholder="Confirm new password"
                  className="h-12.5 bg-white"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleChangePassword}
              disabled={
                isChangingPassword ||
                !currentPassword ||
                !newPassword ||
                !newPasswordConfirmation ||
                newPassword !== newPasswordConfirmation
              }
              className="bg-[#1E6FA8] text-white font-semibold text-base h-13 rounded-xl hover:bg-[#1a5f92] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full"
            >
              {isChangingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-120 rounded-2xl p-5 sm:p-8 gap-0 shadow-[0px_8px_16px_0px_rgba(145,158,171,0.16)]">
          <DialogTitle className="text-xl font-medium text-[#161C24] leading-7.5 text-center">
            Delete Account
          </DialogTitle>
          <div className="border-b border-[#DFE3E8] mt-4 mb-4" />
          <p className="text-sm text-[#5E707C] leading-5.5 mb-6">
            Deleting your account will remove all of your information from our
            database. This cannot be undone.
          </p>
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-semibold text-[#5E707C] leading-5.5">
              To confirm this, type &quot;Delete&quot;
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center">
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="flex-1 min-h-10 border border-[#DFE3E8] rounded-lg bg-white px-3 text-sm outline-none focus:border-[#1E6FA8] transition-colors"
              />
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== "Delete" || isDeleting}
                className="bg-[#FF4842] text-white text-[15px] font-medium h-10 px-6 rounded-xl hover:bg-[#e63e38] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap w-full sm:w-auto"
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SecuritySection;
