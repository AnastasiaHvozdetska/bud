// Ebani triangles.
 export default function triangleGenerate(array) {

  Array.from(array).forEach(triangle => {
      let width = triangle.offsetWidth,
          height = triangle.offsetHeight;

      if(triangle.classList.contains('bottom-left')) {

        triangle.style.borderWidth = `${height}px 0 0 ${width}px`;

        let cloneTriangle = triangle.cloneNode(true);
        cloneTriangle.style.borderColor = `transparent transparent transparent white`;
        cloneTriangle.style.left = '-4px';
        triangle.parentNode.insertBefore(cloneTriangle, triangle.nextSibling);

      } else if(triangle.classList.contains('bottom-right')) {

        triangle.style.borderWidth = `0 0 ${height}px ${width}px`;

        let cloneTriangle = triangle.cloneNode(true);
        cloneTriangle.style.borderColor = `transparent transparent white`;
        cloneTriangle.style.right = '-1px';
        triangle.parentNode.insertBefore(cloneTriangle, triangle.nextSibling);

      } else if(triangle.classList.contains('top-left')) {

        triangle.style.borderWidth = `${height}px ${width}px 0 0 `;
        let cloneTriangle = triangle.cloneNode(true);

        cloneTriangle.style.borderColor = `white transparent transparent`;
        cloneTriangle.style.left = '-1px';
        triangle.parentNode.insertBefore(cloneTriangle, triangle.nextSibling);

      } else if(triangle.classList.contains('top-right')) {
        triangle.style.borderWidth = `0 ${width}px  ${height}px 0 `;

        let cloneTriangle = triangle.cloneNode(true);

        cloneTriangle.style.borderColor = `transparent white transparent transparent`;
        cloneTriangle.style.right = '-3px';

        triangle.parentNode.insertBefore(cloneTriangle, triangle.nextSibling);
      }
  })

}

triangleGenerate(document.querySelectorAll('.triangle'));
