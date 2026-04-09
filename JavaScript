import { useState, useEffect, useRef } from 'react';

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
}

const NoiseBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.05) {
          buffer32[i] = 0xff333333;
        } else {
          buffer32[i] = 0xff000000;
        }
      }

      ctx.putImageData(idata, 0, 0);
      animationFrameId = requestAnimationFrame(drawNoise);
    };

    resize();
    drawNoise();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-20 pointer-events-none z-0"
    />
  );
};

const GlitchText = ({ text, delay = 0 }) => {
  return (
    <div 
      className="relative inline-block group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="relative z-10 text-white group-hover:opacity-0 transition-opacity duration-300">
        {text}
      </span>
      <span className="absolute top-0 left-0 -ml-0.5 text-red-600 opacity-0 group-hover:opacity-100 group-hover:animate-glitch-1 z-0">
        {text}
      </span>
      <span className="absolute top-0 left-0 ml-0.5 text-blue-600 opacity-0 group-hover:opacity-100 group-hover:animate-glitch-2 z-0">
        {text}
      </span>
    </div>
  );
};

const HiddenMemory = ({ visibleText, hiddenContent }) => {
  return (
    <div className="relative group cursor-crosshair border-l border-zinc-800 pl-6 my-12 transition-all duration-700 hover:border-red-900">
      <p className="text-xl text-zinc-300 leading-relaxed group-hover:text-zinc-600 transition-colors duration-500">
        {visibleText}
      </p>
      <div className="absolute inset-0 pl-6 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-1000 flex items-center">
        <div className="text-red-700 text-sm tracking-wide leading-loose bg-black/80 p-4 backdrop-blur-sm">
          {hiddenContent}
        </div>
      </div>
    </div>
  );
};

const ImageFrame = ({ caption, aspect = "aspect-video" }) => {
  return (
    <div className={`w-full ${aspect} bg-zinc-950 relative overflow-hidden group border border-white/5`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <span className="text-zinc-700 text-xs uppercase tracking-widest font-semibold group-hover:text-red-900/50 transition-colors duration-1000">
          {caption}
        </span>
      </div>
      <div className="absolute inset-0 bg-red-900/10 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-700 ease-in-out z-0" />
    </div>
  );
};

const OverviewPage = () => (
  <div className="space-y-32 animate-fade-in relative z-10">
    <section className="pt-20">
      <h1 className="text-6xl font-black mb-8 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
        <GlitchText text="Lát cắt của một thực thể" />
      </h1>
      <div className="w-24 h-1 bg-red-900 mb-12" />
      
      <HiddenMemory 
        visibleText="Tôi là một người thiết kế trải nghiệm. Tôi thích sắp xếp sự hỗn độn thành những trật tự có thể đo lường."
        hiddenContent="Đèn đường chao nghiêng, đổ những vệt mật ong sóng sánh xuống mặt lộ. Tiếng giày gõ đều như nhịp phim cũ. Ánh nhìn sâu thẳm, phong kín cả thời gian."
      />
    </section>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      <ImageFrame caption="Bề mặt lý trí" aspect="aspect-[3/4]" />
      <div className="space-y-12 mt-20">
        <ImageFrame caption="Vùng an toàn ảo" />
        <HiddenMemory 
          visibleText="Đôi khi, việc tìm kiếm một điểm tựa tĩnh lặng giữa thế giới vận hành quá nhanh là một kỹ năng sinh tồn."
          hiddenContent="Bám vào như nhành dây leo ký sinh, ủy thác hết nhựa sống vào cái điểm tựa ngỡ là vĩnh cửu ấy. Chỉ sợ nếu chớp mắt, mọi thứ sẽ vỡ vụn. Đùng."
        />
      </div>
    </div>

    <section className="py-20 border-t border-zinc-900">
      <HiddenMemory 
        visibleText="Tôi quản trị năng lượng của mình bằng những giới hạn rõ ràng. Một hệ thống cân bằng giữa công việc và khoảng lặng."
        hiddenContent="Ong đầu quá. Lại một lần nữa cơn triều xanh xám dâng lên từ dưới chân. Rỗng tuếch như một chiếc vỏ ốc bị sóng đánh dạt vào bờ. Không còn sức lực để bấu víu."
      />
      <div className="grid grid-cols-3 gap-4 mt-12">
        <ImageFrame caption="Mẩu gỗ mục 1" aspect="aspect-square" />
        <ImageFrame caption="Mẩu gỗ mục 2" aspect="aspect-square" />
        <ImageFrame caption="Vỉ bạc 20mg" aspect="aspect-square" />
      </div>
      <p className="text-right text-zinc-800 text-xs mt-4 uppercase tracking-widest">Tuyệt đối không được quên</p>
    </section>
  </div>
);

const ProjectPage = ({ title, intro, hiddenThoughts, images }) => (
  <div className="space-y-24 animate-fade-in relative z-10 min-h-screen">
    <header className="pt-20">
      <h2 className="text-5xl font-bold tracking-tight text-white mb-6 uppercase">
        <GlitchText text={title} />
      </h2>
      <p className="text-zinc-400 max-w-2xl leading-relaxed text-lg border-l-2 border-red-900/50 pl-6">
        {intro}
      </p>
    </header>

    <div className="grid grid-cols-1 gap-32">
      {images.map((img, index) => (
        <div key={index} className="relative group">
          <div className="absolute -inset-4 bg-zinc-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl z-0" />
          <ImageFrame caption={img.caption} aspect={img.aspect} />
          <div className="absolute top-1/2 -right-12 md:-right-24 transform -translate-y-1/2 w-48 md:w-64 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-8 group-hover:translate-x-0 z-20 pointer-events-none">
            <p className="text-red-600/80 text-sm font-mono leading-relaxed bg-black/90 p-4 border border-red-900/30">
              {img.thought}
            </p>
          </div>
        </div>
      ))}
    </div>

    <div className="py-32 flex justify-center">
      <div className="w-full max-w-lg p-10 border border-zinc-800 bg-black/50 hover:border-red-900 transition-colors duration-1000 group cursor-none relative overflow-hidden">
        <div className="absolute inset-0 bg-red-950/10 translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-out" />
        <p className="text-center text-zinc-500 group-hover:text-transparent transition-colors duration-500 relative z-10">
          Kết quả của dự án
        </p>
        <p className="absolute inset-0 flex items-center justify-center p-10 text-center text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300 font-medium z-20">
          {hiddenThoughts}
        </p>
      </div>
    </div>
  </div>
);

export default function Portfolio() {
  const [activeRoute, setActiveRoute] = useState('overview');
  const mouse = useMousePosition();

  const routes = {
    overview: <OverviewPage />,
    tedx: <ProjectPage 
      title="TEDxFTU" 
      intro="Lan tỏa những ý tưởng đáng giá. Nơi những con người kiệt xuất hội tụ và chia sẻ thế giới quan của họ."
      hiddenThoughts="Giữa những tràng vỗ tay rầm rập, tôi thấy mình đang chìm xuống đáy sâu mười mét nước. Ánh đèn sân khấu rực rỡ không đủ làm ấm một linh hồn đã quen với sự ẩm ướt của bóng tối."
      images={[
        { caption: "Sân khấu chính", aspect: "aspect-video", thought: "Họ nói về ánh sáng. Tôi nghĩ về vực thẳm." },
        { caption: "Khán giả", aspect: "aspect-[21/9]", thought: "Những chiếc bóng không mặt người." }
      ]}
    />,
    lions: <ProjectPage 
      title="Vietnam Young Lions" 
      intro="Đấu trường sáng tạo khốc liệt nhất dành cho những cái đầu trẻ. Áp lực tạo ra kim cương."
      hiddenThoughts="Một vòng quay điên cuồng của tham vọng. Vị đắng buốt sắc như mảnh kim loại chạy dọc thực quản khi tôi ép bản thân phải thức tỉnh giữa những ý tưởng đang gào thét."
      images={[
        { caption: "Bản tóm tắt yêu cầu", aspect: "aspect-[4/3]", thought: "Lại một lần nữa cơn triều dâng lên." },
        { caption: "Thành phẩm", aspect: "aspect-square", thought: "Một cái vỏ bọc hoàn hảo che đậy sự vỡ vụn." },
        { caption: "Giải thưởng", aspect: "aspect-video", thought: "Chiếc phao còn sót lại giữa đại dương đen." }
      ]}
    />,
    remake: <ProjectPage 
      title="ReMake ReMac" 
      intro="Tái thiết và định hình lại những giá trị cốt lõi. Một hành trình biến đổi từ những vật liệu cũ kỹ."
      hiddenThoughts="Ngày Nhật cẩn trọng kéo tôi lên từ vực sâu. Lần đầu sau hai mươi lăm năm, tôi thấy mình khô ráo. Việc tái chế này, liệu có thể áp dụng cho một tâm trí đã mục rệu?"
      images={[
        { caption: "Hiện trạng ban đầu", aspect: "aspect-video", thought: "Bóng tối ùa vào đặc quánh." },
        { caption: "Quá trình tái thiết", aspect: "aspect-[16/6]", thought: "Tuyệt đối không được quên thuốc." },
        { caption: "Chân dung mới", aspect: "aspect-[3/4]", thought: "Một chiếc vỏ rỗng được sơn phết lại." }
      ]}
    />
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-red-900 selection:text-black overflow-x-hidden relative">
      <NoiseBackground />
      
      <div 
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 mix-blend-difference"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.05), transparent 40%)`
        }}
      />

      <div className="max-w-6xl mx-auto px-8 relative z-10 flex flex-col md:flex-row min-h-screen">
        <nav className="w-full md:w-64 flex-shrink-0 pt-20 pb-10 md:pb-0 border-b md:border-b-0 md:border-r border-white/5 md:pr-12 md:mr-12 md:sticky md:top-0 md:h-screen overflow-y-auto hidden-scrollbar">
          <div className="space-y-12">
            <div>
              <p className="text-zinc-600 text-xs mb-4 uppercase tracking-widest">Hệ thống tệp</p>
              <ul className="space-y-4">
                {['overview', 'tedx', 'lions', 'remake'].map((route) => (
                  <li key={route}>
                    <button 
                      onClick={() => setActiveRoute(route)}
                      className={`text-sm tracking-widest uppercase transition-all duration-500 w-full text-left relative group py-2
                        ${activeRoute === route ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                      <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-red-700 transition-all duration-300 group-hover:h-full
                        ${activeRoute === route ? 'h-full' : ''}`} 
                      />
                      <span className="pl-4 block">
                        {route === 'overview' ? 'Tổng quan' : route === 'tedx' ? 'TEDxFTU' : route === 'lions' ? 'Young Lions' : 'ReMake ReMac'}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-12 border-t border-zinc-900">
              <p className="text-zinc-700 text-xs leading-relaxed uppercase">
                Đi du lịch Dùng ngay Kèo thơm
              </p>
            </div>
          </div>
        </nav>

        <main className="flex-grow pb-32">
          {routes[activeRoute]}
        </main>
      </div>
    </div>
  );
}
