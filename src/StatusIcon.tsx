import { faCheckCircle, faClock, faHospital, faPlane, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AbsenceStatus, AbsenceType } from './types';

interface PropDefs {
  status: AbsenceStatus | AbsenceType
}

const STATUS_ICONS = {
  requested: faClock,
  confirmed: faCheckCircle,
  rejected: faTimesCircle,
  sickness: faHospital,
  vacation: faPlane,
}

export const StatusIcon = ({ status }: PropDefs) => {
  return <FontAwesomeIcon icon={STATUS_ICONS[status]} title={status} />
}
