import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p 
                style={{
                    'textAlign':'center',
                    'fontWeight': 'bold',
                    'fontSize': '24px'
                }}>
                PAGE DOESN'T EXIST
            </p>
            <Link style={{
                'display': 'block',
                'textAlign':'center',
                'fontWeight': 'bold',
                'fontSize': '24px',
                'margin': '30px'
                }} 
                to="/">BACK TO MAIN PAGE</Link>
        </div>
    )
}
export default Page404;