import './styles.css';
import notebookImg from '../../assets/notebook.png';

export default function CatalogCard() {
  return (
    <div className="dsc-card">
      <div className="dsc-catalog-card-top dsc-line-bottom">
        <img src={notebookImg} alt="notebook" />
      </div>
      <div className="dsc-catalog-card-bottom">
        <h3>R$5000,00</h3>
        <h4>Computador Gamer XT</h4>
      </div>
    </div>
  );
}
