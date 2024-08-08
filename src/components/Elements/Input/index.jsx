import Label from "./Label.jsx";
import Input from "./Input.jsx";


const Inputform = (props)=>{
    const {label, name,placeholder,type,maxlength,required} = props;
    return (
      <div className="mb-6">
        <Label htmlFor={name}>{label}</Label>
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          maxlength={maxlength}
          required={required}
        />
      </div>
    )
}




export default Inputform;