import moment from 'moment';
import Item from './Item';
const List = ({ listData, deleteData }) => {
  let date = moment().format('YYYY-MM-DD');

  return (
    <div>
      {listData.map((item, i) => {
        const { msg } = item;
        return <Item key={i} msg={msg} date={date} />;
      })}
    </div>
  );
};
export default List;