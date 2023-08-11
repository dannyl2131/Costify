import Badge from 'react-bootstrap/Badge';

function addSavingsGoal() {
  return (
    <div>
      <h1>
         <Badge bg="secondary">${savings}</Badge>
      </h1>
    </div>
  );
}

export default addSavingsGoal;