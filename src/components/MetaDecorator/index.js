import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { HOSTNAME } from "../../constants";
import red_hackru_notif from "../../design/media/red_hackru_notif.png";
import red_hackru from "../../design/media/red_hackru.png";

const MetaDecorator = ({ title, description, notif, imageAlt }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <link rel="shortcut icon" href={notif ? HOSTNAME + red_hackru_notif : HOSTNAME + red_hackru} />
        </Helmet>
    );
};

MetaDecorator.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
};

export default MetaDecorator;