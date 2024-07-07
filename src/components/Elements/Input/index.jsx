import Label from "./Label.jsx";
import Input from "./Input.jsx";


const Inputform = (props)=>{
    const {label, name,placeholder,type} = props;
    return(
        <div className="mb-6">
            <Label htmlFor={name}>{label}</Label>
            <Input name={name} type= {type} placeholder={placeholder}/>
        </div>

    );
}




export default Inputform;