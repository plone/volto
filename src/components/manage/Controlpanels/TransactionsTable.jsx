import { Table } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { map } from 'lodash';

const TransactionsTable = ({ transactions }) => {
  return (
    <Table selectable fixed celled compact singleLine attached>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>
            <FormattedMessage id="Transactions Checkbox" defaultMessage="#" />
          </Table.HeaderCell>
          <Table.HeaderCell width={3}>
            <FormattedMessage id="What" defaultMessage="What" />
          </Table.HeaderCell>
          <Table.HeaderCell width={3}>
            <FormattedMessage id="Who" defaultMessage="Who" />
          </Table.HeaderCell>
          <Table.HeaderCell width={3}>
            <FormattedMessage id="When" defaultMessage="When" />
          </Table.HeaderCell>
          <Table.HeaderCell width={3}>
            <FormattedMessage id="Note" defaultMessage="Note" />
          </Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(transactions, (transaction) => (
          <Table.Row id={transaction.id} key={transaction.id}>
            <Table.Cell width={1}>
              <input value={false} type="checkbox" />
            </Table.Cell>
            <Table.Cell width={3} title={[transaction.description].join(' ')}>
              {transaction.description}
            </Table.Cell>
            <Table.Cell width={3}>
              {transaction.user_name ? transaction.user_name : 'Zope'}
            </Table.Cell>
            <Table.Cell width={3}>{transaction.time}</Table.Cell>
            <Table.Cell width={3}>Note</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TransactionsTable;
