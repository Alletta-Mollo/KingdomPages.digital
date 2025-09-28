import { useEffect, useState } from 'react';
import { Users } from 'lucide-react'; 
import StatCard from './StatCard'; 

const ActiveReadersCard = () => {
  const [totalUsers, setTotalUsers] = useState(null);

  useEffect(() => {
    fetch('https://kingdompages.digital/api/visitors') // replace with your actual backend URL
      .then(res => res.json())
      .then(data => setTotalUsers(data.visitors))
      .catch(err => {
        console.error('Error fetching user count:', err);
        setTotalUsers('N/A');
      });
  }, []);

  return (
    <StatCard
      icon={Users}
      value={totalUsers ?? '...'}
      label="Active Readers"
      color="border-secondary"
      delay={0.3}
    />
  );
};

export default ActiveReadersCard;
