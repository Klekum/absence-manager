import { faCheckCircle, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AbsenceStatus } from './types';

interface PropDefs {
  status: AbsenceStatus;
}

const STATUS_ICONS = {
  requested: faClock,
  confirmed: faCheckCircle,
  rejected: faTimesCircle,
}

export const AbsenceStatusIcon = ({ status }: PropDefs) => {
  return <FontAwesomeIcon icon={STATUS_ICONS[status]} title={status} />
}
