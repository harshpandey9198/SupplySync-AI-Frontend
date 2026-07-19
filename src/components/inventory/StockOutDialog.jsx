import {

Dialog,

DialogTitle,

DialogContent,

DialogActions,

Button,

TextField,

} from "@mui/material";

import { useState } from "react";

function StockOutDialog({

open,

onClose,

onSave,

}){

const [quantity,setQuantity]=useState("");

return(

<Dialog open={open} onClose={onClose}>

<DialogTitle>

Stock Out

</DialogTitle>

<DialogContent>

<TextField

fullWidth

type="number"

label="Quantity"

margin="normal"

value={quantity}

onChange={(e)=>setQuantity(e.target.value)}

/>

</DialogContent>

<DialogActions>

<Button onClick={onClose}>

Cancel

</Button>

<Button

variant="contained"

color="error"

onClick={()=>{

onSave(quantity);

setQuantity("");

}}

>

Save

</Button>

</DialogActions>

</Dialog>

);

}

export default StockOutDialog;