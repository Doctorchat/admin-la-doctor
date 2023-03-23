import PropTypes from "prop-types";
import { Card, Form, Select } from "antd";
import { useState } from "react";

const RegionInfo = ({ regions }) => {
  const [selectedRegion, setSelectedRegion] = useState(regions?.find((r) => r.checked) || null);

  const info = [
    `Preț mesaj: ${selectedRegion?.public_price} ${selectedRegion?.currency_code}`,
    `Preț mesaj (privat): ${selectedRegion?.private_price} ${selectedRegion?.currency_code}`,
    `Preț meeting: ${selectedRegion?.public_meet_price} ${selectedRegion?.currency_code}`,
    `Preț meeting (privat): ${selectedRegion?.private_meet_price} ${selectedRegion?.currency_code}`,
  ];

  return (
    <>
      <Form.Item name="region" label="Regiune">
        <Select
          options={regions?.map((region) => ({ value: region.region_slug, label: region.region_name })) || []}
          onSelect={(value) => setSelectedRegion(regions?.find((r) => r.region_slug === value))}
        />
      </Form.Item>

      {!!selectedRegion && (
        <Card title={selectedRegion?.region_name}>
          {info.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </Card>
      )}
    </>
  );
};
RegionInfo.propTypes = {};
export default RegionInfo;

RegionInfo.propTypes = {
  regions: PropTypes.arrayOf(PropTypes.object),
};
