import React from "react";
import "./Registrations.css";

const Registrations = () => {
  const registrations = [
    { rollNumber: "21CSE001", name: "Anand", meetingId: "MEET-1001", conferenceName: "AI & Data Science Summit 2025" },
    { rollNumber: "21CSE002", name: "Ajay", meetingId: "MEET-1002", conferenceName: "Cloud Computing Conference" },
    { rollNumber: "21CSE003", name: "Rahul", meetingId: "MEET-1003", conferenceName: "Cybersecurity Workshop" },
    { rollNumber: "21CSE004", name: "Sai", meetingId: "MEET-1004", conferenceName: "Blockchain Summit" },
    { rollNumber: "21CSE005", name: "Vikram Reddy", meetingId: "MEET-1005", conferenceName: "AI & Data Science Summit 2025" },
    { rollNumber: "21CSE006", name: "Meera", meetingId: "MEET-1006", conferenceName: "Quantum Computing Meet" },
    { rollNumber: "21CSE007", name: "Arjun", meetingId: "MEET-1007", conferenceName: "IoT and Robotics Expo" },
    { rollNumber: "21CSE008", name: "Priya", meetingId: "MEET-1008", conferenceName: "Healthcare Tech Conference" },
    { rollNumber: "21CSE009", name: "Deva", meetingId: "MEET-1009", conferenceName: "Sustainable Tech Forum" },
    { rollNumber: "21CSE010", name: "Kavya", meetingId: "MEET-1010", conferenceName: "Web3 & Metaverse Conference" },
  ];

  return (
    <div className="registration-table">
      <h2>Conference Registrations</h2>
      <table>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Meeting ID</th>
            <th>Conference Name</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg, index) => (
            <tr key={index}>
              <td>{reg.rollNumber}</td>
              <td>{reg.name}</td>
              <td>{reg.meetingId}</td>
              <td>{reg.conferenceName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Registrations;
