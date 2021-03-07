import styles from '../styles/components/Profile.module.css'
export function Profile(){
    return (
        <div className={styles.profileContainer}>
            <img src="eu.png" alt="Anderson" />
            <div>
                <strong>Anderson Fernandes</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 1
                </p>
            </div>
        </div>
    );
}