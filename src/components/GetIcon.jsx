import { FaChrome, FaEdge, FaFirefox } from "react-icons/fa";

/**
 * Returns the icon for the given browser or app name
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} props.browserName - Name of the browser
 *
 * @returns {JSX.Element} Rendered icon UI
 */
function GetIcon({ browserName }) {
    switch (browserName) {
        case "Google Chrome":
            return <FaChrome className="text-yellow-400 text-lg" />;
        case "Microsoft Edge":
            return <FaEdge className="text-blue-400 text-lg" />;
        case "Firefox":
            return <FaFirefox className="text-orange-400 text-lg" />;
        default:
            return <FaChrome className="text-gray-400 text-lg" />;
    }
}

export default GetIcon;