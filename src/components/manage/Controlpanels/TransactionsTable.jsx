import { Table } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { map } from 'lodash';

const TransactionsTable = ({ transactions }) => {
  return (
    <Table selectable compact singleLine attached>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>
            <FormattedMessage id="Transactions Checkbox" defaultMessage="#" />
          </Table.HeaderCell>
          <Table.HeaderCell width={3}>
            <FormattedMessage id="Path" defaultMessage="Path" />
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
          <Table.Row>
            <Table.Cell>
              <input type="checkbox" />
            </Table.Cell>
            <Table.Cell>{transaction.description}</Table.Cell>
            <Table.Cell>
              {transaction.user_name ? transaction.user_name : 'Zope'}
            </Table.Cell>
            <Table.Cell>{transaction.time}</Table.Cell>
            <Table.Cell>Note</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TransactionsTable;
