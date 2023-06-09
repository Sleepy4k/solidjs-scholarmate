import styles from './styles';
import * as React from 'react';

const Loader = (props) => {
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
      setLoading(props.loading);
    }, [props.loading]);

    return (
      <>
        {loading ? (
          <div id="spinner" className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div className='spinner-border text-primary' style={styles.loader}>
              <span class="sr-only">{props.title}</span>
            </div>
          </div>
        ) : null}
      </>
    );
};

export default Loader;