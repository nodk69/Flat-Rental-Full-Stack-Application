import React, { useState } from "react";
import { useDeleteOwnerMutation } from "../api/ownerApi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";

const DeleteOwner = ({ ownerId }) => {
  const [deleteOwner, { isLoading }] = useDeleteOwnerMutation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleDelete = async () => {
    try {
      await deleteOwner(ownerId);
      localStorage.clear(); // Clear stored authentication data
      navigate("/login"); //Redirect to login page after deletion
    } catch (error) {
      console.error("Error deleting owner account:", error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="flex items-center gap-2">
            <Trash2 size={16} /> Delete My Account
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action is irreversible.
          </DialogDescription>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete} 
              disabled={isLoading} 
              className="flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteOwner;
