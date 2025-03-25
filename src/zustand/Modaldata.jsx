import { create } from 'zustand';
import PropTypes from 'prop-types';

const Modaldata = create((set) => ({
  isOpen: false,
  blocked: null,
  id: null,
  text1: '',
  text2: '',
  setModalData: (newId, blocked, text1, text2, value) =>
    set({ id: newId, blocked, text1, text2, isOpen: value }),
}));

Modaldata.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  blocked: PropTypes.any,
  id: PropTypes.any,
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  setModalData: PropTypes.func.isRequired,
};

export default Modaldata;
