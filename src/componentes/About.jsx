import React from "react";
import { Helmet } from "react-helmet";

export default function About() {
    return (
        <div>
            <Helmet>
                <title>Sobre Nosotros | E-commerce</title>
                <meta name="description" content="Sobre nosotros de e-commerce" />
            </Helmet>
            <h2>Sobre Nosotros</h2>
            <p classNames="lh-1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At dolor molestiae, error iure dignissimos accusantium eveniet
                magni vero nesciunt minus nulla obcaecati ducimus pariatur cum!
            </p>
            <p classNames="lh-1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque odit libero aut facere nostrum enim nesciunt. Beatae
                facere consectetur repudiandae ipsum! Eos commodi voluptas obcaecati numquam recusandae aut, quos voluptate, magni deleniti
                dicta vitae aperiam repellendus, cum earum nulla nesciunt tenetur tempore. Quam, reiciendis dolore omnis dignissimos laborum
                veritatis consectetur? Explicabo vel neque, doloremque totam et provident quo, ducimus, illum nemo recusandae tenetur a debitis
                in necessitatibus ea. Sint ipsum doloribus qui repudiandae eveniet illum quo impedit, reprehenderit ad deleniti?
            </p>

        </div>
    );
}