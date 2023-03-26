import PropTypes from "prop-types";
import { Card, InputNumber, Switch, Typography } from "antd";

const { Text } = Typography;

const RegionInfo = ({ value, onChange }) => {
  const handleSelectRegion = (region) => (isChecked) => {
    onChange(value.map((item) => (item.region_slug === region.region_slug ? { ...item, checked: isChecked } : item)));
  };
  const handlePriceChange = (inputValue) => {
    onChange(value.map((item) => (item.region_slug === inputValue.region_slug ? { ...item, ...inputValue } : item)));
  };

  return (
    <>
      {value.map((region) => (
        <Card
          key={region.region_slug}
          title={<CardTitle title={region?.region_name} onChange={handleSelectRegion(region)} value={region.checked} />}
          style={{ marginBottom: 20 }}
        >
          <PriceInputs value={region} onChange={handlePriceChange} />
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

const CardTitle = ({ title, onChange, value }) => {
  return (
    <div>
      {title}
      <Switch onChange={onChange} style={{ marginLeft: 10 }} checked={value} />
    </div>
  );
};

const PriceInputs = ({ value, onChange }) => {
  const onPriceChange = (type) => (inputValue) => {
    onChange({ ...value, [type]: inputValue });
  };
  return (
    <>
      <div className="d-sm-flex gap-2 flex-column">
        <Text title={5}>Preț mesaj</Text>
        <InputNumber
          addonBefore={value.currency_code}
          value={value.public_price}
          onChange={onPriceChange("public_price")}
        />

        <Text title={5}>Preț mesaj (privat)</Text>
        <InputNumber
          addonBefore={value.currency_code}
          value={value.private_price}
          onChange={onPriceChange("private_price")}
        />
      </div>
      <div className="d-sm-flex gap-2 flex-column">
        <Text title={5}>Preț meeting</Text>
        <InputNumber
          addonBefore={value.currency_code}
          value={value.public_meet_price}
          onChange={onPriceChange("public_meet_price")}
        />

        <Text title={5}>Preț meeting (privat)</Text>
        <InputNumber
          addonBefore={value.currency_code}
          value={value.private_meet_price}
          onChange={onPriceChange("private_meet_price")}
        />
      </div>
    </>
  );
};
