import './style.css';
import { Flipper, Flipped } from 'react-flip-toolkit';

function OrderedList(props: {
  list: VisDatum[],
}) {
  const { list } = props;
  list.sort((itemA, itemB) => itemB.value - itemA.value);
  list.length = 10;
  return (
    <Flipper flipKey={list.map(item => item.tag).join(',')} spring={{ stiffness: 15000, damping: 250 }}>
      <div className="ordered-list">
        {list.map(item => (
          <Flipped key={item.tag} flipId={item.tag}>
            <div className="ordered-list-item">
              <div className="ordered-list-item-tag">
                {item.tag}
                </div>
              <div className="ordered-list-item-value">
                {(item.value * 100).toFixed(2)} %
                <div className="ordered-list-item-bar" style={{ width: item.value * 100 + '%', background: `hsl(${(1 - item.value) * 185 + 55}, 100%, 40%)` }}></div>
              </div>
            </div>
          </Flipped>
        ))}
      </div>
    </Flipper>
  );
}

export default OrderedList;