interface AvatarData {
  src: string;
  alt: string;
}

const avatars: AvatarData[] = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs-ajBE3-l4VU-VL-nUfGaqhPiWHcUbRGNalZTd5ZfXiqw3J916AQxjBog4DMPybN5dUDcyQ0tv76Cb0IeJKy7YJoHqE7A9xCOND0LzdiNanx-YS-4i8znHGGSl6EdeZG1q9F0NAUQNF3Vmbe400Q0quWK7YdNGjFLKQaVdbSh-wtAmRX455R684XkXI7EVGeH8RhRDCk0RGzU8ZDlH0fQPJOILr4t9EJSxyNNf0wRmOEE705GmuvCxyGNSueTAvRg3Vrd1qoS84s",
    alt: "Student portrait 1",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2skSQEtPQBPgS3KQBdZEkcfUoDBK8tTHj06TYtXUOCP0UgUfbe-BeTWgG6IqVJpUB2AIsdDI9_69zPjJXylM8yc3lZpUU2Alc8SSwVjYsZZJdc6Dk3nc3NuNMAy2dzjIm1u0fPH8EAUN07n5_mVgDNmi8_n9AXhmZQCdrE5tkaa1ptXdAwX7f4skOBEcF_Rdn84kUzt8oP8wjJZqq_1I_aNagom60PWDR98VBqon-fbwFykxmwu0SOffSz0NEBzMO3aCw0Bngj9w",
    alt: "Student portrait 2",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2HZxHpXdT6YpmC5P_kYGer5zejbztNSBrwYzUBBvOCFV5Yj_tBPFYsSS_0cGFDitZpVbtM09ZwI7tBgIg-JxugOpe0wgQXDLKHFChh8lFcjtjxuY6uQQCCCbs1e9dUgxpTFgW6HisyRqquUXKwqT6bBkS3pVdo9twSsTQMXsguYpsUPeKFajZB8F0rqy9hcZorf4iQgCXY8PeuWSRlTWeaGvvuKajUe-zmCNUXfLqzOTAg2Xl-aTCcbyyHxV9nCc3StIG74RRrK8",
    alt: "Student portrait 3",
  },
];

const UserAvatarGroup: React.FC = () => {
  return (
    <div className="mt-8 flex gap-4">
      <div className="flex -space-x-3">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            alt={avatar.alt}
            className="w-10 h-10 rounded-full border-2 border-primary object-cover"
            src={avatar.src}
          />
        ))}
      </div>
      <div className="flex flex-col text-left justify-center">
        <span className="text-sm font-semibold">100+ Students</span>
        <span className="text-xs text-white/60">Active today</span>
      </div>
    </div>
  );
};

export default UserAvatarGroup;
