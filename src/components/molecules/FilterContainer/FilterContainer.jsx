import { connect } from 'react-redux';
import { setFilter } from '../../../state/actions';
import Tags from '../../atoms/Tags/Tags';

const mapStateToProps = (state) => ({
  selected: state.filter,
});

const mapDispatchToProps = (dispatch) => ({
  filter: (filter) => dispatch(setFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags)