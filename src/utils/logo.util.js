import macLogo from "../assets/icons/512.png";
import winLogo from "../assets/icons/512.png";
import { isMacOS } from "./platform.util";

export const getLogo = () => (isMacOS() ? macLogo : winLogo);
