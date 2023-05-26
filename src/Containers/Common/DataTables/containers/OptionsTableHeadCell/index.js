import CrossIcon from '../../../../../assets/svg/cross.svg';
import OptionsIcon from '../../../../../assets/svg/options.svg';
import IconButton from '../../../Buttons/IconButton';
import styles from './OptionsTableHeadCell.module.scss';

const OptionsTableHeadCell = ( {
	filterOption, setIsFilterOpen, resetOptions=false
} ) => (
	<th
		className={ styles['options-cell']}
	>
		{ filterOption ?
			<div className={styles['actions__wrapper']}>
				<IconButton
					backgroundColor='#FFFFFF'
					iconSrc={ OptionsIcon }
					onClick={ () => setIsFilterOpen( s => !s ) }
					height='32px'
					width='32px'
					padding='7px'
					borderRadius='4px'
				/>
				{ resetOptions && <IconButton
					backgroundColor='#FFFFFF'
					iconSrc={ CrossIcon }
					onClick={ () => resetOptions() }
					height='32px'
					width='32px'
					padding='9px'
					borderRadius='4px'
				/>
				}
			</div> :
			'' }
	</th>
);

export default OptionsTableHeadCell;
