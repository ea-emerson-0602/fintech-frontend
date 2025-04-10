import { IconType } from "react-icons";
import PropTypes from "prop-types";
const IconComponent = ({ icon: Icon }) => {
return <Icon />;
};
IconComponent.propTypes = {
icon: PropTypes.func.isRequired,
};
export default IconComponent;