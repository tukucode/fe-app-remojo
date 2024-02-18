import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useNavigate } from "react-router-dom";
import "../assets/css/NavBreadcrumb.css";

// eslint-disable-next-line react/prop-types
export default function NavBreadcrumb({ navList = [] }) {
  const navigateTo = useNavigate();

  function onNavigateTo(url) {
    navigateTo(url);
  }

  function generateItemBreadcrumb(data, index) {
    let { to, title, isActive } = data;

    if (isActive) {
      return (
        <Breadcrumb.Item key={`nav-item-${index + 1}`} active>
          {title}
        </Breadcrumb.Item>
      );
    }

    return (
      <Breadcrumb.Item
        key={`nav-item-${index + 1}`}
        onClick={() => onNavigateTo(to)}
      >
        {title}
      </Breadcrumb.Item>
    );
  }

  return (
    <Breadcrumb id="nav--breadcrumb" className="custom--breadcrumb">
      {navList.map((item, index) => generateItemBreadcrumb(item, index))}
    </Breadcrumb>
  );
}
