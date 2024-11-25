// src/pages/LegalNotice.tsx
import React from 'react';
import Layout from '../components/layout/Layout';
import './Legal.scss';

const LegalNotice: React.FC = () => {
  return (
    <>
      <Layout page="legal">
        <h2 className="legal__title">Aviso Legal</h2>
        <h3 className="legal__subtitle1">1. Datos identificativos</h3>
        <p className="legal__text">
          Usted está visitando la página web{' '}
          <b>
            <a href="/privacy">
              <a href="/privacy">
                <b>http://pildorasux.com/</b>
              </a>
            </a>
          </b>{' '}
          titularidad de Gema Gutiérrez Medina. Domiciliada en Avd Olímpica, 32,
          con DNI:46889606N y correo electrónico de contacto es{' '}
          <b>hola@pildorasux.com.</b>
        </p>{' '}
        <p className="legal__text">
          <b>En adelante La Titular.</b> Puede contactar con la TITULAR a través
          del correo electrónico hola@pildorasux.com
        </p>
        <h3 className="legal__subtitle1">2. Usuarios</h3>
        <p className="legal__text">
          Las presentes condiciones (en adelante, Aviso Legal) tiene por
          finalidad regular el uso de la página web de LA TITULAR que pone a
          disposición del público.{' '}
        </p>{' '}
        <p className="legal__text">
          El acceso y/o uso de esta página web atribuye la condición de USUARIO,
          que acepta, desde dicho acceso y/o uso, las condiciones generales de
          uso aquí reflejadas. Las citadas condiciones serán de aplicación
          independientemente de las condiciones generales de contratación que en
          su caso resulten de obligado cumplimiento.{' '}
        </p>
        <h3 className="legal__subtitle1">3. Uso del portal</h3>
        <p className="legal__text">
          <b>
            <a href="/privacy">
              <a href="/privacy">
                <b>http://pildorasux.com/</b>
              </a>
            </a>
          </b>{' '}
          proporciona el acceso a multitud de informaciones, servicios,
          programas o datos (en adelante, “los contenidos”) en Internet
          pertenecientes a LA TITULAR o a sus licenciantes a los que el USUARIO
          puede tener acceso.
        </p>{' '}
        <p className="legal__text">
          El usuario asume la responsabilidad del uso del portal. Dicha
          responsabilidad se extiende al registro que fuese necesario para
          acceder a determinados servicios o contenidos. En dicho registro el
          USUARIO será responsable de aportar información veraz y lícita. Como
          consecuencia de este registro, al USUARIO se le puede proporcionar una
          contraseña de la que será responsable, comprometiéndose a hacer un uso
          diligente y confidencial de la misma.
        </p>{' '}
        <p className="legal__text">
          El USUARIO se compromete a hacer un uso adecuado de los contenidos y
          servicios (p.e. servicios de chat, foros de discusión o grupos de
          noticias) que LA TITULAR ofrece a través de su portal y con carácter
          enunciativo pero no limitativo, a no emplearlos para:{' '}
        </p>{' '}
        <p className="legal__text">
          1. Incurrir en actividades ilícitas, ilegales o contrarias a la buena
          fe y al orden público.{' '}
        </p>{' '}
        <p className="legal__text">
          2. Difundir contenidos o propaganda racista, xenófoba,
          pornográfico-ilegal, de apología del terrorismo o atentatoria contra
          los derechos humanos.{' '}
        </p>{' '}
        <p className="legal__text">
          3. Provocar daños en los sistemas físicos y lógicos de{' '}
          <b>PíldorasUX</b> de sus proveedores o de terceras personas,
          introducir o difundir en l red virus informáticos o cualesquiera otros
          sistemas físicos o lógicos que sean susceptibles de provocar los daños
          anteriormente mencionados.{' '}
        </p>{' '}
        <p className="legal__text">
          4. Intentar acceder y, en su caso, utilizar las cuentas de correo
          electrónico de otros usuarios y modificar o manipular sus mensajes.{' '}
        </p>{' '}
        <p className="legal__text">
          5. Utilizar el sitio web ni las informaciones que en él se contienen
          con fines comerciales, políticos, publicitarios y para cualquier uso
          comercial, sobre todo en el envío de correos electrónicos no
          solicitados.{' '}
        </p>{' '}
        <p className="legal__text">
          LA TITULAR se reserva el derecho a retirar todos aquellos comentarios
          y aportaciones que vulneren el respeto a la dignidad de la persona,
          que sean discriminatorios, xenófobos, racistas pornográficos, que
          atenten contra la juventud o la infancia, el orden o la seguridad
          pública o que, a su juicio, no resultarán adecuados para su
          publicación. En cualquier caso, EL TITULAR no será responsable de las
          opiniones vertidas por los usuarios a través de los foros, chats, u
          otras herramientas de participación.{' '}
        </p>{' '}
        <h3 className="legal__subtitle1">4. Protección de datos</h3>
        <p className="legal__text">
          Todo lo relativo a la política de protección de datos se encuentra
          recogido en el documento de{' '}
          <a href="/privacy">Política de Privacidad.</a>{' '}
        </p>{' '}
        <h3 className="legal__subtitle1">5. Contenidos.</h3>
        <p className="legal__text">
          Propiedad intelectual e industrial EL TITULAR es propietario de todos
          los derechos de propiedad intelectual e industrial de su página web,
          así como de los elementos contenidos en la misma (a título
          enunciativo: imágenes, fotografías, sonido, audio, vídeo, software o
          textos; marcas o logotipos, combinaciones de colores, estructura y
          diseño, selección de materiales usados, programas de ordenador
          necesarios para su funcionamiento, acceso y uso, etc), titularidad del
          TITULAR o bien de sus licenciantes.{' '}
        </p>{' '}
        <p className="legal__text">
          Todos los derechos reservados. En virtud de lo dispuesto en los
          artículos 8 y 32.1, párrafo segundo, de la Ley de Propiedad
          Intelectual, quedan expresamente prohibidas la reproducción, la
          distribución y la comunicación pública, incluida su modalidad de
          puesta a disposición, de la totalidad o parte de los contenidos de
          esta página web, con fines comerciales, en cualquier soporte y por
          cualquier medio técnico, sin la autorización del TITULAR.{' '}
        </p>
        <h3 className="legal__subtitle1">
          {' '}
          6. Exclusión de garantías y responsabilidad.
        </h3>
        <p className="legal__text">
          EL USUARIO reconoce que la utilización de la página web y de sus
          contenidos y servicios se desarrolla bajo su exclusiva
          responsabilidad. En concreto, a título meramente enunciativo, EL
          TITULAR no asume ninguna responsabilidad en los siguientes ámbitos:
        </p>{' '}
        <p className="legal__text">
          – La disponibilidad del funcionamiento de la página web, sus servicios
          y contenidos y su calidad o interoperabilidad.{' '}
        </p>{' '}
        <p className="legal__text">
          -La finalidad para la que la página web sirva a los objetivos del
          USUARIO.{' '}
        </p>{' '}
        <p className="legal__text">
          -La infracción de la legislación vigente por parte del USUARIO o
          terceros y, en concreto, de los derechos de propiedad intelectual e
          industrial que sean titularidad de otras personas o entidades.{' '}
        </p>{' '}
        <p className="legal__text">
          -La existencia de códigos maliciosos o cualquier otro elemento
          informático dañino que pudiera causar el sistema informático del
          USUARIO o de terceros. Corresponde al USUARIO, en todo caso, disponer
          de herramientas adecuadas para la detección y desinfección de estos
          elementos.{' '}
        </p>{' '}
        <p className="legal__text">
          -El acceso fraudulento a los contenidos o servicios por terceos no
          autorizados, o, en su caso, la captura, eliminación, alteración,
          modificación o manipulación de los mensajes y comunicaciones de
          cualquier clase que dichos terceros pudiera realizar.
        </p>{' '}
        <p className="legal__text">
          -La exactitud, veracidad, actualidad y utilidad de los contenidos y
          servicios ofrecidos y la utilización posterior que de ellos haga el
          USUARIO. LA TITULAR empleará todos los esfuerzos y medios razonables
          para facilitar la información actualizada y fehaciente.{' '}
        </p>{' '}
        <p className="legal__text">
          -Los daños producidos a equipos informáticos durante el acceso a la
          página web y los daños producidos a los USUARIOS cuando tengan su
          origen en fallos o desconexiones en las redes de telecomunicaciones
          que interrumpan el servicio.{' '}
        </p>{' '}
        <p className="legal__text">
          -Los daños o perjuicios que se deriven de circunstancias acaecidas por
          caso fortuito o fuerza mayor.{' '}
        </p>{' '}
        <p className="legal__text">
          En caso de que existan foros, el uso de los mismos u otros espacios
          análogos, ha de tenerse en cuenta que los mensajes reflejen únicamente
          la opinión del USUARIO que los remite, que es el único responsable. LA
          TITULAR no se hace responsable del contenido de los mensajes enviados
          por el USUARIO.{' '}
        </p>
        <h3 className="legal__subtitle1">
          7. Modificación de este aviso legal y duración
        </h3>
        <p className="legal__text">
          EL TITULAR se reserva el derecho de efectuar sin previo aviso las
          modificaciones que considere oportunas en su portal, pudiendo cambiar,
          suprimir o añadir tantos contenidos y servicios que se presten a
          través de la misma, como la forma en la que éstos aparezcan
          representados o localizados en su portal.
        </p>{' '}
        <p className="legal__text">
          {' '}
          La vigencia de las citadas condiciones irá en función de su exposición
          y estarán vigentes hasta que sean modificadas por otras debidamente
          publicadas.{' '}
        </p>{' '}
        <h3 className="legal__subtitle1">8. Enlaces</h3>
        <p className="legal__text">
          En el caso de que en{' '}
          <a href="/privacy">
            <a href="/privacy">
              <b>http://pildorasux.com/</b>
            </a>
          </a>{' '}
          se incluyesen enlaces o hipervínculos hacia otros sitios de Internet,
          LA TITULAR no ejercerá ningún tipo de control sobre dichos sitios y
          contenidos.{' '}
        </p>{' '}
        <p className="legal__text">
          En ningún caso LA TITULAR asumirá responsabilidad alguna por los
          contenidos de algún enlace perteneciente a un sitio web ajeno, ni
          garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud,
          amplitud, veracidad, validez y constitucionalidad de cualquier materia
          o información contenida en ninguno de dichos hipervínculos y otros
          sitios en Internet.{' '}
        </p>{' '}
        <p className="legal__text">
          Igualmente, la inclusión de estas conexiones externas no implicará
          ningún tipo de asociación, fusión o participación con las entidades
          conectadas.
        </p>{' '}
        <h3 className="legal__subtitle1">9. Derechos de exclusión</h3>
        <p className="legal__text">
          LA TITULAR ser reserva el derecho a denegar o retirar el acceso a
          portal y/o los servicios ofrecidos sin necesidad de advertencia
          previa, a instancia propia o de un tercero, a aquellos usuarios que
          incumplan el contenido de este aviso legal.{' '}
        </p>
        <h3 className="legal__subtitle1">10. Generalidades </h3>
        <p className="legal__text">
          EL TITULAR perseguirá el incumplimiento de las presentes condiciones
          así como cualquier utilización indebida de su portal ejerciendo todas
          las acciones civiles y penales que le puedan corresponder en derecho.{' '}
        </p>
        <h3 className="legal__subtitle1">
          11. Legislación aplicable y jurisdicción
        </h3>
        <p className="legal__text">
          La relación entre LA TITULAR y EL USUARIO se regirá por la normativa
          española vigente. Todas las disputas y reclamaciones derivadas de este
          aviso legal se resolverán por los juzgados y tribunales españoles.{' '}
        </p>
        <h3 className="legal__subtitle1">12. Menores de edad</h3>
        <p className="legal__text">
          <a href="/privacy">
            <a href="/privacy">
              <b>http://pildorasux.com/</b>
            </a>
          </a>{' '}
          dirige sus servicios a usuarios mayores de 18 años. Los menores de
          esta edad no están autorizados a utilizar nuestros servicios y no
          deberán, por tanto, enviarnos sus datos personales.{' '}
        </p>{' '}
        <p className="legal__text">
          Informamos de que si se da tal circunstancia, LA TITULAR no se hace
          responsable de las posibles consecuencias que pudieran derivarse del
          incumplimiento del aviso que en esta misma cláusula se establece.{' '}
        </p>
        <h3 className="legal__subtitle1"> 13. Comentario en el blog</h3>
        <p className="legal__text">
          El usuario de{' '}
          <a href="/privacy">
            <a href="/privacy">
              <b>http://pildorasux.com/</b>
            </a>
          </a>{' '}
          que haga uso del blog vertiendo sus comentarios declara haber leído
          estas condiciones y estar de acuerdo con todos los puntos expuestos a
          continuación.{' '}
        </p>{' '}
        <p className="legal__text">
          Cualquier comentario pasará por un filtro previo a su publicación que
          atenderá a estos criterios:{' '}
        </p>{' '}
        <p className="legal__text">
          Se rechazarán aquellos comentarios que contengan insultos, amenazas o
          vocabulario mal sonante.{' '}
        </p>{' '}
        <p className="legal__text">
          Nos reservamos el derecho de rechazar igualmente aquellos comentarios
          enfocados a menoscabar la dignidad de otros usuarios.
        </p>{' '}
        <p className="legal__text">
          {' '}
          No se permitirán publicaciones que contengan calumnias ni aquellas que
          promuevan discriminación o actitudes violentas contra cualquier
          colectivo.{' '}
        </p>{' '}
        <p className="legal__text">
          <b>
            LA TITULAR se reserva el derecho a suspender a aquellos usuarios si
            consideramos que sus comentarios y su actividad tienden a resultar
            molestos para el resto de usuarios y no permite el normal desarrollo
            de las conversaciones.
          </b>
        </p>{' '}
        <p className="legal__text"> Última actualización 01-08-2023</p>
      </Layout>
    </>
  );
};
export default LegalNotice;
