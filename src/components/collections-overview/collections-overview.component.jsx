import './collections-overview.styles.scss';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollecions } from "../../redux/shop/shop.selectors";

import CollectionPreview from '../../components/collection-preview-/collection-preview.component';


const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {
      collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollecions
});

export default connect(mapStateToProps)(CollectionsOverview);
