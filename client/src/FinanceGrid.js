import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Icon from '@mdi/react';
import { mdiMinusBoxOutline, mdiPlusBoxOutline } from '@mdi/js';

function FinanceGrid() {
  const [financeData, setFinanceData] = useState([]);

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const fetchFinanceData = () => {
    fetch('http://localhost:8000/finance/list')
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setFinanceData(sortedData);
          })
      .catch(error => console.error('Error fetching finance data:', error));
  };

  const getIconByType = (type) => {
    if (type === 'expense') {
      return <Icon path={mdiMinusBoxOutline} size={1} />;
    } else if (type === 'income') {
      return <Icon path={mdiPlusBoxOutline} size={1} />;
    }
    return null;
  };

  return (
    <Container>
      <h2>Vaše finance</h2>
        <Table striped bordered hover>
          <tbody>
            {financeData.map(finance => (
              <tr key={finance.id}>
                <td>{getIconByType(finance.type)}</td>
                <td>{new Date(finance.date).toLocaleDateString()}</td>
                <td>{finance.type === 'expense' ? 'Výdaj' : 'Příjem'}</td>
                <td>{finance.type === 'expense' ? '-' : ''}{finance.amount} Kč</td>
              </tr>
            ))}
          </tbody>
        </Table>
    </Container>
  );
}

export default FinanceGrid;
