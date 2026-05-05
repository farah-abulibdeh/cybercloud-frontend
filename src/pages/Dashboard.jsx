import { Link } from "react-router-dom";
import { Activity, Database, Lock, Router, ExternalLink } from "lucide-react";

const services = [
  {
    title: "Account & Home Service",
    icon: <Database size={28} />,
    text: "Manages user accounts, homes, and rooms. This service creates the structure that devices belong to.",
    route: "/accounts",
    tag: "Accounts · Homes · Rooms",
  },
  {
    title: "Device Registry Service",
    icon: <Router size={28} />,
    text: "Registers IoT devices under rooms, lists devices, updates device details, changes status, and deletes devices.",
    route: "/devices",
    tag: "Device CRUD",
  },
  {
    title: "Control & Monitoring Service",
    icon: <Activity size={28} />,
    text: "Controls device state and displays monitoring information such as status and activity data.",
    route: "/control",
    tag: "Control · Status",
  },
  {
    title: "Security & Access Logging Service",
    icon: <Lock size={28} />,
    text: "Validates access requests, records allowed or denied attempts, and shows security logs and alerts.",
    route: "/security",
    tag: "Logs · Alerts",
  },
];

export default function Dashboard() {
  return (
    <section>
      <div className="page-header dashboard-hero">
        <h2>CyberCloud - Smart Home Platform</h2>
        <p className="subtitle">
          Our CMP404 Project!! It's a deployed microservices-based IoT home system where the frontend consumes
          independent Azure Web App services through REST APIs
        </p>
      </div>

      <div className="cards-grid">
        {services.map((service) => (
          <Link to={service.route} className="card service-card" key={service.title}>
            <div className="card-top">
              <div className="card-icon">{service.icon}</div>
              <ExternalLink size={18} className="open-icon" />
            </div>

            <p className="service-tag">{service.tag}</p>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </Link>
        ))}
      </div>

      <div className="deployment-note">
        <h3>Deployment Architecture</h3>
        <p>
          CyberCloud is deployed using a client-service-database structure. The React
          frontend is hosted on Azure Static Web Apps, so users can access the system
          directly from a public Azure URL without running anything locally
        </p>

        <p>
          The backend is separated into four Spring Boot microservices, and each
          microservice is deployed independently as an Azure Web App. The frontend
          communicates with these services using HTTPS REST requests and receives JSON
          responses.
        </p>

        <p>
          Each microservice connects to its own Azure MySQL database. The databases
          remain private inside the Azure cloud network, meaning users interact only
          with the frontend and backend APIs, not directly with the databases.
        </p>
      </div>
    </section>
  );
}