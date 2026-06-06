import { career } from '../data/portfolio';

export default function Career() {
    return (
        <section id="career" className="reveal">
            <h2 className="section-heading">MY CAREER &amp; EXPERIENCE</h2>
            <div className="career-entries">
                {career.map((item, i) => (
                    <div className="career-entry" key={i}>
                        <span className="year">{item.year}</span>
                        <div>
                            <h3 className="entry-title">{item.title}</h3>
                            <p className="entry-company">{item.company}</p>
                            <p className="entry-desc">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
