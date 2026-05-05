import { Activity, Database, Lock, Router } from "lucide-react";

const services = [
  {
    title: "Account & Home Service",
    icon: <Database size={26} />,
    text: "Creates accounts, homes, and rooms.",
  },
  {
    title: "Device Registry Service",
    icon: <Router size={26} />,
    text: "Registers, lists, updates, enables/disables, and deletes IoT devices.",
  },
  {
    title: "Control & Monitoring Service",
    icon: <Activity size={26} />,
    text: "Controls device state and retrieves monitoring information.",
  },
  {
    title: "Security & Access Logging Service",
    icon: <Lock size={26} />,
    text: "Validates requests and displays logs and alerts.",
  },
];

export default function Dashboard() {
  return (
    <section>
      <div className="page-header">
        <p className="eyebrow">Azure Deployment</p>
        <h2>CyberCloud Dashboard</h2>
        <p className="subtitle">
          A deployed frontend that consumes independently deployed CyberCloud microservices through REST APIs.
        </p>
      </div>

      <div className="cards-grid">
        {services.map((service) => (
          <div className="card" key={service.title}>
            <div className="card-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </div>
        ))}
      </div>

      <div className="deployment-note">
        <h3>Deployment Architecture</h3>
        <p>
          The frontend is intended to run on Azure Static Web Apps. Each backend microservice is hosted as an Azure Web App and connects to its own private Azure MySQL database through the cloud network setup.
        </p>
      </div>
    </section>
  );
}
