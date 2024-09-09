import TechMarquee from '../components/marque.jsx';
import { clientReviews } from '../constants/index.js';

const Clients = () => {
  const FrontendStacks = [
    '/assets/react.png',
    '/assets/reactnative.png',
    '/assets/3js.png',
    '/assets/figma.png',
    '/assets/flutter.png',
    '/assets/tailwind.png',
    '/assets/vite.png',
    '/assets/zustand.png',
    '/assets/typescript.png',
    '/assets/redux.png',
    '/assets/next.png',
    '/assets/blender.png',
    '/assets/css.png',
    '/assets/framer.png',
    '/assets/html.png',
    '/assets/js.png',
  ];
  const BackendStack = [
    '/assets/vercel.png',
    '/assets/nodejs.png',
    '/assets/netlify.png',
    '/assets/npm.png',
    '/assets/python.png',
    '/assets/firebase.png',
    '/assets/vscode.png',
    '/assets/npm.png',
    '/assets/git.png',
    '/assets/docker.png',
    '/assets/express.png',
  ];
  const DBMS = [
    '/assets/mysql.png',
    '/assets/mongodb.png',
    '/assets/prisma.png',
    '/assets/psql.png',
    '/assets/googledocs.png',
    '/assets/excel.png',
    '/assets/atlas.png',
  ];
  const APIS = [
    '/assets/github.png',
    '/assets/sass.png',
    '/assets/googleapis.png',
    '/assets/huggingface.png',
    '/assets/codium.png',
    '/assets/chatgpt.png',
    '/assets/minecraft.png',
    '/assets/androidstd.png',
    '/assets/spotifyapi.png',
    '/assets/ubantu.png',
    '/assets/stackoverflow.png',
    '/assets/thunderclient.png',
    '/assets/postman.png',
    '/assets/mailtrap.png',
    '/assets/cloudary.png',
    '/assets/bootstrap.png',
  ];
  return (
    <section className="c-space my-20">
      <h3 className="head-text">Skill_set </h3>

      <div className="client-container">
        {clientReviews.map((item) => (
          <div key={`review-${item.id}`} className="client-review">
            <div>
              {/* <p className="text-white-800 font-light">{item.review}</p> */}

              <div>
                {item.id === 1 ? (
                  <TechMarquee techStack={FrontendStacks} />
                ) : item.id === 2 ? (
                  <TechMarquee techStack={BackendStack} />
                ) : item.id === 3 ? (
                  <TechMarquee techStack={DBMS} />
                ) : item.id === 4 ? (
                  <TechMarquee techStack={APIS} />
                ) : (
                  <p>Default Content</p>
                )}
              </div>

              <div className="client-content">
                <div className="flex gap-3">
                  <img src={item.img} alt="reviewer" className="w-15 h-12 rounded-full" />
                  <div className="flex flex-col">
                    <p className="font-semibold text-white-800">{item.name}</p>
                    <p className="text-white-500 md:text-base text-sm font-light">{item.position}</p>
                  </div>
                </div>

                {/* <div className="flex self-end items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <img key={index} src="/assets/star.png" alt="star" className="w-5 h-5" />
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
