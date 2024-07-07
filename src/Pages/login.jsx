import AuthLayouts from "../components/Layouts/AuthLayouts.jsx";

import FormLogin from '../components/Fragments/FormLogin';


const LoginPage = ()=>{

    return(
        <AuthLayouts title="login" type="login">
            <FormLogin/>
            
            
        </AuthLayouts>
    );

}


export default LoginPage;