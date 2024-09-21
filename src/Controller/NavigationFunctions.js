import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

export const navigateToVersion = (version) => {
  navigate(`v/${version}`);
};

export const navigateToAnotherVersion = (version) => {
  navigate(`${version}`);
};

export const navigateToPackage = (name) => {
  navigate(`/package/${name}`);
};
