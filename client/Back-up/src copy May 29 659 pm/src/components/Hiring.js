import React from "react";
import Card from "./components/HiringCard";
import "./index.css";

function App() {
  return (
    <div className="Flex flex-col py-12 px-12">
      <Card
        imageUrl="https://media.istockphoto.com/id/1393767097/photo/young-black-man-wiping-computer-monitors-while-woman-with-mop-cleaning-floor.webp?b=1&s=170667a&w=0&k=20&c=d3TeX2eXbJ4tSeIke1dFVhG6BZBTkQY23rAXtjQbbFI="
        imageAlt="Janitor"
        position="Janitor"
        description="Responsible for maintaining cleanliness and orderliness of buildings and premises. Duties may include sweeping, mopping, vacuuming, emptying trash bins, and cleaning restrooms."
        requirements="['High school diploma or equivalent', 'Attention to detail', 'Physical stamina', 'Safety Conciousness', 'Reliability and dependability', 'Teamwork']"
        experience="1-2 years of janitorial experience preferred"
        salary="minimum wage w/ incentives"
      />
      <Card
        imageUrl="https://media.istockphoto.com/id/1417833124/photo/professional-cleaner-cleaning-a-table-at-a-house.jpg?s=612x612&w=0&k=20&c=WNc3TvhLIETMdAZTa4dALGvkZGXWaDHG9CihXID31F4="
        imageAlt="Housekeeper"
        position="Housekeeper"
        description="Responsible for cleaning and maintaining guest rooms and common areas in hotels, resorts, or other accommodation establishments. Duties may include making beds, dusting, vacuuming, and restocking supplies."
        requirements="['Ability to follow instructions', 'Time management skills', 'Attention to Details', 'Physically Fit', 'Communication skills', 'Flexibility', 'Trustworthy',]"
        experience="Previous housekeeping experience is a plus"
        salary="minimum wage w/ incentives"
      />
      <Card
        imageUrl="https://media.istockphoto.com/id/949220048/photo/woman-cleaning-computer-in-office.jpg?s=612x612&w=0&k=20&c=0-iP9v2XY9qw3xwEaa4zaYZm8u1IpLGN_YHvyCnKg9o="
        imageAlt="Office Cleaner"
        position="Office Cleaner"
        description="Responsible for cleaning and tidying office spaces and workstations. Duties may include dusting, sweeping, mopping, sanitizing surfaces, emptying trash bins, and restocking supplies."
        requirements="['Ability to follow instructions', 'Time management skills']"
        experience="Previous housekeeping experience is a plus"
        salary="minimum wage w/ incentives"
      />
      <Card
        imageUrl="https://media.istockphoto.com/id/478025456/photo/man-washing-machines-at-a-factory.jpg?s=612x612&w=0&k=20&c=L_MqOpjlD7zn5RvAng9rnYB7t9ROkpnTVFLuI3QAQaE="
        imageAlt="Industrial Cleaner"
        position="Industrial Cleaner"
        description="Specializes in cleaning and maintaining industrial sites and facilities. Duties may include sweeping, scrubbing, pressure washing, and handling hazardous materials."
        requirements="['Ability to follow instructions', 'Time management skills', 'Knowledge of industrial cleaning techniques', 'Safety consciousness', 'Ability to follow procedures',]"
        experience="Previous experience in industrial cleaning or similar roles is often preferred. Familiarity with the specific challenges and requirements of cleaning in industrial settings can be advantageous."
        salary="minimum wage w/ incentives"
      />
      <Card
        imageUrl="https://media.istockphoto.com/id/1472518382/photo/professional-cleaning-team.webp?b=1&s=170667a&w=0&k=20&c=fnZcKboekBybkiqeo3lBHL4JZT9_trxLUEimbU0K_eU="
        imageAlt="Residential cleaner"
        position="Residential Cleaner"
        description="Offers cleaning services for private residences. Duties may include general cleaning, organizing, laundry, and specialized tasks as requested by clients."
        requirements="['Ability to follow instructions', 'Time management skills']"
        experience="Previous housekeeping experience is a plus"
        salary="minimum wage w/ incentives"
      />

      {/* add more Card components as needed */}
    </div>
  );
}

export default App;
