import { Navigate } from "react-router-dom";

const PrivateDoctorRoute = ({ children }) => {
    const doctorSession = localStorage.getItem("doctorSession");
    if (!doctorSession) {
        return <Navigate to={"/doctor-login"} replace />
    }
    return children;
}

export default PrivateDoctorRoute;