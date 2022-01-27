import PropTypes from "prop-types";
import {
  allergiesOptions,
  diseasesOptions,
  epidemiologicalOptions,
  sexOptions,
} from "../../context/constants";
import getSelectOptValue from "../../utils/getSelectOptValue";

import "./styles/index.scss";

export default function InvestigationCard(props) {
  const { investigation } = props;

  return (
    <div className="investigation-card">
      <div className="investigation-card__block">
        <div className="investigation-card__property">
          <div className="property__title">Nume</div>
          <div className="property__description">{investigation.name}</div>
        </div>
        <div className="investigation-card__property">
          <div className="property__title">Gen</div>
          <div className="property__description">
            {getSelectOptValue(sexOptions, investigation.sex)}
          </div>
        </div>
      </div>
      <div className="investigation-card__block">
        <div className="investigation-card__property">
          <div className="property__title">Vârsta</div>
          <div className="property__description">{investigation.age}</div>
        </div>
        <div className="investigation-card__property">
          <div className="property__title">Înălțime(cm)</div>
          <div className="property__description">{investigation.height}</div>
        </div>
        <div className="investigation-card__property">
          <div className="property__title">Greutate(kg)</div>
          <div className="property__description">{investigation.weight}</div>
        </div>
      </div>
      <div className="investigation-card__block">
        <div className="investigation-card__property">
          <div className="property__title">Gen de activitate</div>
          <div className="property__description">{investigation.activity}</div>
        </div>
      </div>
      <div className="investigation-card__block">
        <div className="investigation-card__property">
          <div className="property__title">Datele epidemiologice</div>
          <div className="property__description">
            {getSelectOptValue(epidemiologicalOptions, investigation.epidemiological)}
          </div>
        </div>
      </div>
      <div className="investigation-card__block">
        <div className="investigation-card__property">
          <div className="property__title">Boli suportate</div>
          <div className="property__description">
            {getSelectOptValue(diseasesOptions, investigation.diseases)}
          </div>
        </div>
      </div>
      <div className="investigation-card__block">
        <div className="investigation-card__property">
          <div className="property__title">Specificații</div>
          <div className="property__description">{investigation.diseases_spec}</div>
        </div>
      </div>
      <div className="investigation-card__block">
        <div className="investigation-card__property">
          <div className="property__title">Alergii</div>
          <div className="property__description">
            {getSelectOptValue(allergiesOptions, investigation.allergies)}
          </div>
        </div>
      </div>
      <div className="investigation-card__block">
        <div className="investigation-card__property">
          <div className="property__title">Specificații</div>
          <div className="property__description">{investigation.allergies_spec}</div>
        </div>
      </div>
    </div>
  );
}

InvestigationCard.propTypes = {
  investigation: PropTypes.object,
};
