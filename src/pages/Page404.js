import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import ErrorMessage from "../components/errorMessage/ErrorMessage";

const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Page doesn't exist or site have some problems"
                    />
                <title>Error page</title>
            </Helmet>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to='/'>Back to main page</Link>
        </div>
    );
}

export default Page404;