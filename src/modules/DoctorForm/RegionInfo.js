import PropTypes from "prop-types";
import { Card, Switch } from "antd";

const RegionInfo = ({ value, onChange }) => {
  const getInfo = (region) => [
    `Preț mesaj: ${region?.public_price} ${region?.currency_code}`,
    `Preț mesaj (privat): ${region?.private_price} ${region?.currency_code}`,
    `Preț meeting: ${region?.public_meet_price} ${region?.currency_code}`,
    `Preț meeting (privat): ${region?.private_meet_price} ${region?.currency_code}`,
  ];
  const handleSelectRegion = (region) => (isChecked) => {
    onChange(value.map((item) => (item.region_slug === region.region_slug ? { ...item, checked: isChecked } : item)));
  };
  return (
    <>
      {value.map((region) => (
        <Card
          key={region.region_slug}
          title={<Title title={region?.region_name} onChange={handleSelectRegion(region)} value={region.checked} />}
          style={{ marginBottom: 20 }}
        >
          {getInfo(region).map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </Card>
      ))}
    </>
  );
};
RegionInfo.propTypes = {};
export default RegionInfo;

RegionInfo.propTypes = {
  regions: PropTypes.arrayOf(PropTypes.object),
};

const Title = ({ title, onChange, value }) => {
  return (
    <div>
      {title}
      <Switch onChange={onChange} style={{ marginLeft: 10 }} checked={value} />
    </div>
  );
};
