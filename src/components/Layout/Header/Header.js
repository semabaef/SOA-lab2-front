import React, { useState } from 'react';
import styles from './Header.module.css';
import { Container } from '../Container/Container';
// import {Link} from "react-router-dom";

export const Header = ({
    backgroundColor = 'transparent',
}) => {
    return (
        <header className={styles.header} style={{ backgroundColor }}>
            <Container>
                <div className={styles.headerInnerContainer}>
                    <p className={styles.logo}><span className="yellow">LAB2</span>SOA</p>
                    <p className={styles.name}>Семён Шибаев <span className="yellow">P34111</span></p>
                </div>
            </Container>
        </header>
    );
};
