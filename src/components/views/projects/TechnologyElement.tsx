export const TechnologyElement = ({ technology }: { technology: string }) => {

    const getTechnologyColor = (technology: string) => {
        switch (technology) {
            case 'HTML':
                return '#e34c26';

            case 'CSS':
                return '#2565ae';

            case 'SCSS':
                return '#cd6799';

            case 'JavaScript':
                return '#f0db4f';

            case 'TypeScript':
                return '#007acc';

            case 'React':
                return '#61dbfb';

            case 'Redux':
                return '#764abc';

            case 'Bootstrap':
                return '#563d7c';

            case 'MongoDB':
                return '#3fa037';

            case 'NestJS':
                return '#d5214a';

            case 'SQL':
                return '#f29111';

            case 'NodeJS':
                return '#3c873a';

            case 'Jest':
                return '#913f56';

            default:
                return '';
        }
    };

    return (
        <li className="projects__technologies-item" style={{ color: getTechnologyColor(technology) }}>
            {technology}
        </li>
    );
};