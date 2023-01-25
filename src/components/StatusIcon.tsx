import { faCheck, faClock, faHospital, faSun, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AbsenceStatus, AbsenceType } from './../types';

interface PropDefs {
  status: AbsenceStatus | AbsenceType
}

const STATUS_ICONS = {
  requested: faClock,
  confirmed: faCheck,
  rejected: faTimes,
  sickness: faHospital,
  vacation: faSun,
}

export const StatusIcon = ({ status }: PropDefs) => {
  return <FontAwesomeIcon icon={STATUS_ICONS[status]} title={status} />
}
