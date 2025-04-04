import { useAuth } from '../context/AuthContext';

       const Dashboard = () => {
         const { user } = useAuth();

         return (
           <div className="min-h-screen bg-gray-100 p-6">
             <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
             <p>Welcome to your dashboard, {user.name}!</p>
             <p>Your role: {user.role}</p>
           </div>
         );
       };

       export default Dashboard;