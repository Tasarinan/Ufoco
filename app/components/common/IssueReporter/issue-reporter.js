import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@blueprintjs/core';
/** TBD */
const URL = '#';

const IssueReporter = ({ showIssueReportingModal, closeFeedback }) => (
  <Dialog
    title=""
    isOpen={showIssueReportingModal}
    onClose={closeFeedback}
    className="h-60 w-50"
  >
    <iframe
      title="Feedback"
      src={URL}
      width="100%"
      height="100%"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
    >
      Please wait while we generate your form.
    </iframe>
  </Dialog>
);

IssueReporter.propTypes = {
  showIssueReportingModal: PropTypes.bool.isRequired,
  closeFeedback: PropTypes.func.isRequired
};

export default IssueReporter;
